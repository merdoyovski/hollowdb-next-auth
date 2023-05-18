import { Avatar, Text, Button, Paper, rem } from "@mantine/core";
import { useProfileContext } from "../context/profile.context";
import { IconRefresh } from "@tabler/icons-react";
import { getProfile } from "../api/apiClient";
import { notifications } from "@mantine/notifications";
import { computeKey, valueToBigInt } from "@/lib/prover";
import { useEffect } from "react";

export default function ProfileCard(props) {
  const {
    pfp,
    username,
    progressLevel,
    setProgressLevel,
    setProfileLocal,
    signMessageAsync,
  } = useProfileContext();

  const { isConnected } = props.useAccount();

  useEffect(() => {
    if (isConnected && progressLevel === 0) {
      setProgressLevel(1);
    } else if (isConnected && username) {
      setProgressLevel(3);
    } else if (!isConnected) {
      setProgressLevel(0);
      setProfileLocal({ pfp: "", username: "" });
    }
  }, [isConnected, username]);

  const handleRetrieve = async () => {
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
    notifications.update({
      id: notification,
      title: "Searching...",
      message: "Looking for the profile corresponding to this key.",
      autoClose: 4000,
    });
    const key = await computeKey(valueToBigInt(secret));

    const profile = await getProfile(key);
    const curValue = profile.data.data.value;
    console.log("profile", profile);
    if (curValue) {
      setProfileLocal(curValue);
      notifications.show({
        id: finalizedNotification,
        title: "Success!",
        message: "Profile found.",
        autoClose: 5000,
      });
    } else {
      notifications.show({
        id: finalizedNotification,
        title: "Failed!",
        color: "red",
        message: "A profile corresponding to this signature is not found.",
        autoClose: 5000,
      });
    }
  };

  return (
    <Paper
      radius="md"
      withBorder
      p="lg"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
      })}
    >
      {!username && (
        <Button
          disabled={!isConnected}
          component="a"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleRetrieve}
          leftIcon={<IconRefresh size={rem(18)} />}
          styles={(theme) => ({
            root: {
              backgroundColor: "#0D76FD",
              border: 0,

              marginBottom: rem(20),
              "&:not([data-disabled])": theme.fn.hover({
                backgroundColor: theme.fn.darken("#0D76FD", 0.05),
              }),
            },
          })}
        >
          Retrieve
        </Button>
      )}

      <Avatar src={pfp} size={120} radius={120} mx="auto" />

      <Text ta="center" fz="lg" weight={500} mt="md">
        {username || "Profile does not exist"}
      </Text>
    </Paper>
  );
}
