import { useForm } from "@mantine/form";
import { TextInput, Button, Group, Box } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { getProfile, updateProfile, createProfile } from "../api/apiClient";
import { useProfileContext } from "../context/profile.context";
import { generateProof, computeKey, valueToBigInt } from "../lib/prover";
import { notifications } from "@mantine/notifications";

function EditForm(props) {
  const { setProfileLocal, signMessageAsync } = useProfileContext();

  const { isConnected } = props.useAccount();

  const form = useForm({
    initialValues: {
      pfp: "",
      username: "",
    },
  });

  const handleUpload = async () => {
    const notification = "profile-upload";
    const finalizedNotification = "profile-finalized";
    notifications.show({
      id: notification,
      title: "Signing message...",
      message: "Please sign the message in your wallet.",
      loading: true,
      autoClose: false,
    });
    const secret = await signMessageAsync();
    const key = await computeKey(valueToBigInt(secret));

    const profile = await getProfile(key);
    const curValue = profile.data.data.value;

    if (!curValue) {
      notifications.update({
        id: notification,
        title: "Creating new profile",
        message: "Uploading data to HollowDB...",
        autoClose: 4000,
      });
      createProfile(key, form.values)
        .then((res) => {
          if (res.statusText == "OK") {
            setProfileLocal(form.values);
            notifications.show({
              id: finalizedNotification,
              title: "Success!",
              message: "Transaction is finalized. The profile is created.",
              autoClose: 5000,
            });
          }
        })
        .catch((err) => {
          notifications.show({
            id: finalizedNotification,
            title: "Failed!",
            message: "Failed to create a profile.",
            autoClose: 5000,
            color: "red",
            icon: <IconX />,
          });
        });
    } else {
      notifications.update({
        id: notification,
        title: "Generating Proof",
        message: "Generating the proof to update the profile",
        autoClose: 4000,
      });
      const { proof } = await generateProof(
        valueToBigInt(secret),
        curValue,
        form.values
      );
      notifications.update({
        id: notification,
        title: "Proof Generated",
        message: "Updating the profile using the generated proof",
        autoClose: 4000,
      });

      updateProfile(key, form.values, proof)
        .then((res) => {
          if (res.statusText == "OK") {
            setProfileLocal(form.values);
            notifications.show({
              id: finalizedNotification,
              title: "Success!",
              message: "Transaction is finalized. The proof is valid.",
              autoClose: 5000,
            });
          }
        })
        .catch((err) => {
          notifications.show({
            id: finalizedNotification,
            title: "Failed!",
            message: "The proof is invalid.",
            autoClose: 5000,
            color: "red",
            icon: <IconX />,
          });
        });
    }
  };
  return (
    <Box maw={320} mx="auto">
      <TextInput
        label="Profile Picture"
        placeholder="Image URL"
        styles={{ label: { fontSize: "1rem" } }}
        {...form.getInputProps("pfp")}
      />

      <TextInput
        label="Anonymous Username"
        mt="md"
        placeholder="Merdo"
        styles={{ label: { fontSize: "1rem" } }}
        {...form.getInputProps("username")}
      />

      <Group position="center" mt="xl">
        <Button
          disabled={!isConnected}
          variant="outline"
          onClick={handleUpload}
        >
          Upload
        </Button>
      </Group>
    </Box>
  );
}

export default EditForm;
