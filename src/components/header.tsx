import { Box, Container, Text, Group, Title, ActionIcon } from "@mantine/core";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FC, useEffect } from "react";
import { useDisconnect } from "wagmi";
import { IconBrandGithub } from "@tabler/icons-react";

const WalletHeader: FC = () => {
  const { disconnect } = useDisconnect();

  // Disconnect wallet on page refresh
  useEffect(() => {
    window.onbeforeunload = function (e) {
      e.preventDefault();

      disconnect();
      return ""; // Legacy method for cross browser support
    };

    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  return (
    <Box component="header" py="md">
      <Container>
        <Group>
          <Title order={1}>Authentication</Title>
          <Text fz="xs" fw={700}>
            Powered by HollowDB
          </Text>
          <ActionIcon
            component="a"
            target="_blank"
            href="https://github.com/merdoyovski/hollowdb-next-auth"
          >
            <IconBrandGithub size="2rem" />
          </ActionIcon>
          <span style={{ flexGrow: 1 }} />
          <ConnectButton></ConnectButton>
        </Group>
      </Container>
    </Box>
  );
};

export default WalletHeader;
