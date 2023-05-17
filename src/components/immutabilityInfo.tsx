import {
  Text,
  Button,
  Paper,
  Anchor,
  Group,
  Space,
  Collapse,
  TextInput,
} from "@mantine/core";
import { useProfileContext } from "../context/profile.context";
import { IconX } from "@tabler/icons-react";
import { getProfile, updateProfile } from "../api/apiClient";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { testKey, HOLLOWDB_TEST_TXID } from "@/constants";
import { computeKey, generateProof, valueToBigInt } from "@/lib/prover";
import { useForm } from "@mantine/form";
import { SDK } from "hollowdb";
import { useEffect, useState } from "react";
import { CustomSignature, Warp, WarpFactory } from "warp-contracts";

const warp = WarpFactory.forMainnet();

export default function ImmutableInfo(props) {
  const [hollowdb, setHollowdb] = useState<SDK>(null);

  const form = useForm({
    initialValues: {
      preImage: "",
    },
  });
  const [opened, { toggle }] = useDisclosure(false);
  const { isConnected } = props.useAccount();

  useEffect(() => {
    const init = async () => {
      if (!isConnected) return;

      setHollowdb(
        new SDK(
          {
            // you need to do this lazily, otherwise you get "SubtleCrypto undefined" error
            signer: (await import("warp-contracts-plugin-signature"))
              .evmSignature,
            type: "ethereum",
          },
          HOLLOWDB_TEST_TXID,
          warp
        )
      );
    };
    init();
  }, [isConnected]);

  const attempToChange = async () => {
    if (!hollowdb) {
      console.log("no hollow", hollowdb);
    } else {
      const notification = "profile-upload";
      const finalizedNotification = "profile-finalized";
      notifications.show({
        id: notification,
        title: "Signing message...",
        message: "Please sign the message in your wallet.",
        loading: true,
        autoClose: false,
      });
      notifications.update({
        id: notification,
        title: "Generating Proof",
        message: "Generating the proof to update the profile",
        autoClose: 4000,
      });

      const secret = form.values.preImage;
      const oldValue = await hollowdb.get(testKey);
      const newValue = "dummyValue";
      const { proof } = await generateProof(
        valueToBigInt(secret),
        oldValue,
        newValue
      );

      notifications.update({
        id: notification,
        title: "Proof Generated",
        message: "Updating the profile using the generated proof",
        autoClose: 4000,
      });
      hollowdb
        .update(secret, newValue, proof)
        .then(() => {
          notifications.show({
            id: finalizedNotification,
            title: "Success!",
            message: "Transaction is finalized. The proof is valid.",
            autoClose: 5000,
          });
        })
        .catch(() => {
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
    <Paper
      radius="md"
      withBorder
      p="lg"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
      })}
    >
      <Text ta="center" fz="lg" weight={500}>
        Can't be Changed
      </Text>

      <Text ta="center" fz="md" weight={300}>
        The hashed signature also has a crucial role in data management. Because
        the key is tied to a specific hashed signature, only the original
        signer, who holds the private key, can update the information. This is
        achieved by generating a zk-proof because a valid proof requires the
        pre-image of the hashed signature.
      </Text>
      <Space h="md" />
      <Text ta="center" fz="md" weight={300}>
        This mechanism provides users with exclusive control over their on-chain
        data, ensuring that they can manage their presence securely and
        independently.
      </Text>
      <Space h="md" />
      <Group position="center">
        <Button onClick={toggle}>Explore</Button>
      </Group>

      <Collapse in={opened}>
        <Space h="md" />
        <Text ta="center" fz="md" weight={300}>
          Here is a an existing key signed by another person. Here is the full
          key:
        </Text>

        <Text ta="center" fz="md" weight={300}>
          47359045705392796822755070709295484182
          20332715061423656258515080175565373207
        </Text>
        <Space h="md" />
        <Anchor
          href="https://sonar.warp.cc/#/app/interaction/H9d1ORbrpyeUTqQGD3U-gBWcbLSlYRDyks8xGoXwwNw"
          target="_blank"
        >
          <Text ta="center" fz="md" weight={300}>
            The transaction
          </Text>
        </Anchor>
        <Space h="md" />
        <Text ta="center" fz="md" weight={300}>
          Try to modify the data, by providing the correct pre-image
        </Text>
        <Space h="md" />
        <TextInput
          label="Pre-Image of the Key"
          placeholder="No chance"
          {...form.getInputProps("preImage")}
        />
        <Space h="md" />
        <Group position="center">
          <Button variant="outline" onClick={attempToChange}>
            Attemp to Change
          </Button>
        </Group>
      </Collapse>
    </Paper>
  );
}
