import {
  Avatar,
  Box,
  HStack,
  Icon,
  IconButton,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  HamburgerMenu,
  RefineThemedLayoutV2HeaderProps,
} from "@refinedev/chakra-ui";
import { useGetIdentity } from "@refinedev/core";
import { IconMoon, IconSun } from "@tabler/icons";
import { User } from "src/types";

type IUser = {
  id: number;
  name: string;
  avatar: string;
};

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = () => {
  const { data: user } = useGetIdentity<User>();

  const { colorMode, toggleColorMode } = useColorMode();

  const bgColor = useColorModeValue(
    "refine.header.bg.light",
    "refine.header.bg.dark"
  );

  return (
    <Box
      py="2"
      pr="4"
      pl="2"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      w="full"
      height="64px"
      bg={bgColor}
      borderBottom="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
    >
      <HamburgerMenu />
      <HStack>
        <IconButton
          variant="ghost"
          aria-label="Toggle theme"
          onClick={toggleColorMode}
        >
          <Icon
            as={colorMode === "light" ? IconMoon : IconSun}
            w="24px"
            h="24px"
          />
        </IconButton>
        {(user?.nombre) && (
          <HStack>
            {user?.nombre && (
              <Text size="sm" fontWeight="bold">
                {user.nombre}
              </Text>
            )}
            <Avatar size="sm" name={user?.nombre}  />
          </HStack>
        )}
      </HStack>
    </Box>
  );
};
