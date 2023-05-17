import { Text, Timeline, Box } from "@mantine/core";
import {
  IconUserEdit,
  IconUserCircle,
  IconWallet,
  IconUpload,
} from "@tabler/icons-react";
import { useProfileContext } from "../context/profile.context";

const AppTimeline = () => {
  const { progressLevel } = useProfileContext();
  const iconSize = 20;

  return (
    <Box maw={320} mx="auto">
      <Timeline active={progressLevel} bulletSize={32}>
        <Timeline.Item
          title="Connect your wallet"
          bullet={<IconWallet size={iconSize}> </IconWallet>}
        >
          <Text color="dimmed" size="sm">
            Connect your metamask wallet to sign a message
          </Text>
        </Timeline.Item>
        <Timeline.Item
          title="Create a profile"
          bullet={<IconUserCircle size={iconSize}> </IconUserCircle>}
        >
          <Text color="dimmed" size="sm">
            Set your profile information
          </Text>
        </Timeline.Item>
        <Timeline.Item
          title="Upload to HollowDB"
          bullet={<IconUpload size={iconSize} />}
        >
          <Text color="dimmed" size="sm">
            Upload your profile to HollowDB with your signature
          </Text>
        </Timeline.Item>
        <Timeline.Item
          title="Update Profile"
          bullet={<IconUserEdit size={iconSize}> </IconUserEdit>}
        >
          <Text color="dimmed" size="sm">
            Update your profile by providing the proof of your signature
          </Text>
        </Timeline.Item>
      </Timeline>
    </Box>
  );
};

export default AppTimeline;
