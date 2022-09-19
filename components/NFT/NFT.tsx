import { Skeleton } from "@chakra-ui/react";
import React, { useState } from "react";

import style from "./nft.module.scss";

interface NFTProps {
  item: NFTItem,
  onClick: () => void
}

export default function NFT({ item, onClick }: NFTProps) {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  return (
    <div className={style.nft} onClick={onClick}>
      <div className={style["nft-image"]}>
        <img
          // src={'/images/logo.png'}
          src={item.metadata.image}
          className={imageLoaded ? style.show : ''}
          alt="nft"
          onLoad={() => {
            setImageLoaded(true)
          }}
        />
        {
          !imageLoaded && 
          <Skeleton startColor='pink.100' endColor='pink.200' height='100%' />
        }
      </div>
      <h3>{item.metadata.name}</h3>
      <div className={style["line-top"]}></div>
      <div className={style["line-bottom"]}></div>
      <div className={style["line-left"]}></div>
      <div className={style["line-right"]}></div>
    </div>
  );
}
