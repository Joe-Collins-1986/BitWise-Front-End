import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

import useProfile from "../../hooks/useProfile";
import { useResetFilters } from "../../hooks/useResetFilters";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import {
  useSearchFilter,
  useOrderFilter,
  useLanguageFilter,
  useLikedByOwnerFilter,
} from "../../contexts/FilterContext";

import ProfileCard from "../../components/ProfileCard";
import ProfileArticles from "../../components/ProfileArticles";
import CardSkeleton from "../../components/CardSkeleton";
import SearchField from "../../components/SearchField";
import OrderDropdown from "../../components/OrderDropdown";
import LanguageDropdown from "../../components/LanguageDropdown";
import LikedSwitch from "../../components/LikedSwitch";

import {
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  HStack,
  Show,
} from "@chakra-ui/react";

const ProfilePage = () => {
  const { id } = useParams();
  const { pageProfile, error, loaded } = useProfile(id);
  const profile = pageProfile.results[0];
  const currentUser = useCurrentUser();

  const searchFilter = useSearchFilter();
  const orderFilter = useOrderFilter();
  const languageFilter = useLanguageFilter();
  const likedByOwnerFilter = useLikedByOwnerFilter();
  const endpoint =
    `/articles/?owner__profile=${id}&search=${searchFilter}&ordering=${orderFilter}` +
    `${
      likedByOwnerFilter ? `&likes__owner__profile=${likedByOwnerFilter}` : ""
    }` +
    `&primary_language=${languageFilter}`;

  const resetFilters = useResetFilters();
  const { pathname } = useLocation();

  useEffect(() => {
    resetFilters();
  }, [pathname]);

  return (
    <Box p={5}>
      {loaded ? <ProfileCard {...profile} /> : <CardSkeleton height={230} />}
      <Tabs variant="enclosed" colorScheme="purple" pt={5}>
        <TabList>
          <Tab>Articles</Tab>
          <Tab>Languages</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <SearchField />
            <HStack>
              <OrderDropdown />
              <LanguageDropdown />
              {currentUser && (
                <Show above="md">
                  <LikedSwitch />
                </Show>
              )}
            </HStack>
            {currentUser && (
              <Show below="md">
                <LikedSwitch />
              </Show>
            )}
            <ProfileArticles endpoint={endpoint} />
          </TabPanel>
          <TabPanel>
            <Text>Enter Language Component</Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ProfilePage;