import { createContext, useContext } from "react";
import { FC, ReactNode, useState } from "react";
import { message } from "../constants";
import { useSignMessage } from "wagmi";

export type ProfileContextType = {
  pfp: string;
  username: string;
  isLoading: boolean;
  progressLevel: number;
  setProgressLevel: (level: number) => Promise<void>;
  setProfileLocal: (data: any) => Promise<void>;
  signMessageAsync?: () => Promise<string>;
};

export const ProfileContext = createContext<ProfileContextType>({
  pfp: "",
  username: "",
  isLoading: false,
  progressLevel: 0,
  setProgressLevel: async () => {},
  setProfileLocal: async () => {},
  signMessageAsync: async (): Promise<any> => {},
});

export const useProfileContext = () => useContext(ProfileContext);

export const ProfileContextProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [pfp, setPfp] = useState("");
  const [username, setUsername] = useState("");
  const [progressLevel, setProgresslevel] = useState(0);
  const { signMessageAsync } = useSignMessage({
    message: message,
  });

  const setProgressLevel = async (level: number) => {
    setProgresslevel(level);
  };

  const setProfileLocal = async (data: any) => {
    setIsLoading(true);
    setPfp(data.pfp);
    setUsername(data.username);
    setIsLoading(false);
  };

  return (
    <ProfileContext.Provider
      value={{
        pfp,
        username,
        isLoading,
        progressLevel,
        setProgressLevel,
        setProfileLocal,
        signMessageAsync,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
