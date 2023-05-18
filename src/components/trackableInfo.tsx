import {
  Text,
  Button,
  Paper,
  Group,
  Collapse,
  Space,
  Code,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const jsonExample = `
{
  "function":"put",
  "data":
  {
    "key":"4735904570539279682275507070929548418220332715061423656258515080175565373207",
    "value":
    {
      "pfp":"https://expertphotography.b-cdn.net/wp-content/uploads/2020/06/stock-photography-trends11.jpg",
      "username":"Merdo"
    }
  }
}`;

export default function TrackableInfo() {
  const [opened, { toggle }] = useDisclosure(false);

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
        Can't be Tracked
      </Text>
      <Text ta="center" fz="md" weight={300}>
        Each key in the key-value pair represents a hashed signature of a
        specific message. This hashed signature is untraceable, meaning it is
        impossible to identify them, ensuring that users can maintain their
        anonymity while storing their data.
      </Text>
      <Space h="md" />
      <Text ta="center" fz="md" weight={300}>
        Anonimity of the transaction is achieved through using another wallet to
        do the transaction. This demo uses a server with a wallet to execute the
        given transactions
      </Text>
      <Space h="md" />
      <Group position="center">
        <Button variant="outline" onClick={toggle}>
          Explore
        </Button>
      </Group>
      <Collapse in={opened}>
        <Space h="md" />
        <Text ta="center" fz="md" weight={500}>
          &#x2022; Flow of a Put Operation &#x2022;
        </Text>
        <Text ta="center" fz="md" weight={300}>
          Set a secret &#10140; Hash it with Poseidon &#10140; Upload key-value
          pair with hashed secret
        </Text>
        <Space h="md" />
        <Text ta="center" fz="md" weight={500}>
          &#x2022; Flow of an Update Operation &#x2022;
        </Text>
        <Text ta="center" fz="md" weight={300}>
          Generate a proof using the secret, the current value, and the new
          value &#10140; Send the new values to HollowDB together with the proof
        </Text>
        <Space h="md" />
        <Text ta="center" fz="md" weight={350}>
          As you see, none of the steps include exposing anything that can give
          your address out. The only way is to brute force the secret.
        </Text>
        <Space h="md" />
        <Code block>{jsonExample}</Code>
      </Collapse>
    </Paper>
  );
}
