import React from "react";
import { Link } from "react-router-dom";
import { BiLike, BiChat, BiUserPlus, BiUserCircle } from "react-icons/bi";
import { MdMarkChatRead } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
import { FaUserMinus } from "react-icons/fa";
import {
  Button,
  Text,
  Show,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import useLikeArticle from "../hooks/useLikeArticle";

const ArticleCardFooter = (props) => {
  const {
    is_owner,
    id,
    like_id,
    likes_count,
    comments_count,
    setArticles,
    currentUser,
    current_user_comments_count,
    is_following,
    profile_id,
    article_title,
  } = props;

  const custColor = useColorModeValue("#805AD5", "#D6BCFA");

  const { handleLike, handleUnlike } = useLikeArticle(
    id,
    like_id,
    likes_count,
    setArticles,
    article_title
  );

  const handleProfileClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {is_owner ? (
        <Popover placement="top">
          <PopoverTrigger>
            <Button
              flex="1"
              variant="ghost"
              leftIcon={<BiLike />}
              aria-label="Likes"
            >
              <Show above="sm">
                <Text fontSize="sm">Likes</Text>
              </Show>
              <Text fontSize="sm">&nbsp;{likes_count}</Text>
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverCloseButton />
            <PopoverHeader>Sorry...</PopoverHeader>
            <PopoverBody>You can't like your own post!</PopoverBody>
          </PopoverContent>
        </Popover>
      ) : like_id ? (
        <Button
          flex="1"
          variant="ghost"
          leftIcon={<AiFillLike color={custColor} />}
          onClick={handleUnlike}
          aria-label="Unlike"
        >
          <Show above="sm">
            <Text fontSize="sm">Likes</Text>
          </Show>
          <Text fontSize="sm">&nbsp;{likes_count}</Text>
        </Button>
      ) : currentUser ? (
        <Button
          flex="1"
          variant="ghost"
          leftIcon={<BiLike />}
          onClick={handleLike}
          aria-label="Like"
        >
          <Show above="sm">
            <Text fontSize="sm">Likes</Text>
          </Show>
          <Text fontSize="sm">&nbsp;{likes_count}</Text>
        </Button>
      ) : (
        <Popover placement="top">
          <PopoverTrigger>
            <Button
              flex="1"
              variant="ghost"
              leftIcon={<BiLike />}
              aria-label="Likes"
            >
              <Show above="sm">
                <Text fontSize="sm">Likes</Text>
              </Show>
              <Text fontSize="sm">&nbsp;{likes_count}</Text>
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverCloseButton />
            <PopoverHeader>Sorry...</PopoverHeader>
            <PopoverBody>You must be logged in to like posts!</PopoverBody>
          </PopoverContent>
        </Popover>
      )}

      <Link to={`/article/${id}`} aria-label="View comments">
        <Button
          flex="1"
          variant="ghost"
          leftIcon={
            current_user_comments_count > 0 ? (
              <MdMarkChatRead color={custColor} />
            ) : (
              <BiChat />
            )
          }
          aria-label="Comments"
        >
          <Show above="sm">
            <Text fontSize="sm">Comments</Text>
          </Show>
          <Text fontSize="sm">&nbsp;{comments_count}</Text>
        </Button>
      </Link>

      {is_owner ? (
        <Button
          as={Link}
          to={`/profile/${profile_id}`}
          flex="1"
          variant="ghost"
          leftIcon={<BiUserCircle color={custColor} />}
          onClick={handleProfileClick}
          aria-label="View owner profile"
        >
          <Text fontSize="sm">Owner</Text>
        </Button>
      ) : is_following ? (
        <Button
          as={Link}
          to={`/profile/${profile_id}`}
          flex="1"
          variant="ghost"
          leftIcon={<FaUserMinus color={custColor} />}
          onClick={handleProfileClick}
          aria-label="Unfollow user"
        >
          <Text fontSize="sm">Profile</Text>
        </Button>
      ) : (
        <Button
          as={Link}
          to={`/profile/${profile_id}`}
          flex="1"
          variant="ghost"
          leftIcon={<BiUserPlus />}
          onClick={handleProfileClick}
          aria-label="Follow user"
        >
          <Text fontSize="sm">Profile</Text>
        </Button>
      )}
    </>
  );
};

export default ArticleCardFooter;
