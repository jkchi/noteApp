import React, { useState } from "react";
import { Button } from "antd";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { useLike } from "./IsLike";

const StarButton = () => {
  const {isLike,setIsLike} = useLike();

  const handleClick = () => {
    setIsLike(!isLike);
  };

  return (
    <Button
      type="primary"
      shape="circle"
      icon={
        isLike ? (
          <StarFilled
            style={{ color: "#ffe626",fontSize: "32px" }}
          />
        ) : (
          <StarOutlined style={{ color: "gray", fontSize: "32px" }} />
        )
      }
      onClick={handleClick}
      style={{
        boxShadow: "none",
        backgroundColor: "white" ,
      }}
    />
  );
};

export default StarButton;
