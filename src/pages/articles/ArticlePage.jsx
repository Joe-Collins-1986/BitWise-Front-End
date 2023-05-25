import { Box, Flex, Heading, Text, Stack, Divider } from "@chakra-ui/react";

import ArticleCard from "../../components/ArticleCard";

import { useParams } from "react-router-dom";
import CommentCreate from "../../components/CommentCreate";
import ArticleCardSkeleton from "../../components/ArticleCardSkeleton";
import useArticle from "../../hooks/UseArticle";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useState } from "react";

const ArticlePage = () => {
  const { id } = useParams();
  const { article, setArticle, error, loaded } = useArticle(`/articles/${id}`);
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const profile_id = currentUser?.profile_id;

  const [comments, setComments] = useState({ results: [] });

  return (
    <>
      {loaded ? (
        article.results.length ? (
          <Flex p={8} align={"center"} justify={"center"}>
            <ArticleCard
              {...article.results[0]}
              setArticles={setArticle}
              articlePage
            />
          </Flex>
        ) : (
          <Text>No Results Found</Text>
        )
      ) : (
        <Flex p={8} align={"center"} justify={"center"}>
          <Box w={{ base: "100%", md: "500px" }}>
            <ArticleCardSkeleton />
          </Box>
        </Flex>
      )}
      <Flex align={"center"} justify={"center"}>
        <Stack px={10} w="100%">
          <Flex alignItems={"center"} justifyContent={"center"}>
            <Heading pb={5} size="lg">
              Comments
            </Heading>
          </Flex>

          <Flex pb={5} alignItems={"center"} justifyContent={"center"}>
            {comments.results.length ? (
              <Heading size="md">Join the discussion!</Heading>
            ) : currentUser ? (
              <Heading size="md">Be the first to comment!</Heading>
            ) : (
              <Heading size="md">Login to comment</Heading>
            )}
          </Flex>

          {currentUser && (
            <CommentCreate
              profile_id={profile_id}
              profile_image={profile_image}
              article={id}
              setArticle={setArticle}
              setComments={setComments}
              currentUser={currentUser}
            />
          )}
        </Stack>
      </Flex>
    </>
  );
};

export default ArticlePage;
