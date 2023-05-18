import WalletHeader from "../components/header";
import { AppShell, Grid, Divider } from "@mantine/core";
import AppTimeline from "../components/appTimeline";
import EditForm from "../components/form";
import ProfileCard from "../components/profileCard";
import React from "react";
import { ProfileContextProvider } from "../context/profile.context";
import TrackableInfo from "@/components/trackableInfo";
import ImmutableInfo from "@/components/immutabilityInfo";
import { useAccount } from "wagmi";

function App() {
  return (
    <AppShell
      padding="md"
      header={<WalletHeader></WalletHeader>}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <ProfileContextProvider>
        <Grid
          style={{ margin: "0" }}
          gutter={5}
          grow
          gutterXs="md"
          gutterMd="xl"
          gutterXl={50}
        >
          <Grid.Col span={4}>
            <ProfileCard useAccount={useAccount}></ProfileCard>
          </Grid.Col>
          <Grid.Col span={4}>
            <EditForm useAccount={useAccount}></EditForm>
          </Grid.Col>
          <Grid.Col span={4}>
            <AppTimeline></AppTimeline>
          </Grid.Col>
          <Grid.Col span={12}>
            <Divider
              my="xs"
              size="xl"
              label="Understanding the Power of HollowDB"
              labelPosition="center"
              styles={{ label: { fontSize: "1rem", fontWeight: "bold" } }}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <TrackableInfo></TrackableInfo>
          </Grid.Col>
          <Grid.Col span={12}>
            <ImmutableInfo useAccount={useAccount}></ImmutableInfo>
          </Grid.Col>
        </Grid>
      </ProfileContextProvider>
    </AppShell>
  );
}

export default App;
