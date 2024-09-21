import React from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useFetch } from "@/hooks/useFetch";
import { splitAndSortFavorites } from "@/utils/favorites";
import { Icons } from "@/components/ui/icons";
import useHasSmode from "@/hooks/useHasSmode";

const BjImage = ({ userId }: { userId: FavoriteItem["user_id"] }) => (
  <img
    src={`https://stimg.afreecatv.com/LOGO/${userId.slice(0, 2)}/${userId}/m/${userId}.webp`}
    width={25}
    height={25}
    className="size-10 rounded-full"
    alt={`${userId} profile`}
  />
);

const BroadPopover = ({ broadInfo }: { broadInfo: BroadInfo }) => (
  <a href={broadInfo.url}>
    <img
      src={broadInfo.broad_img}
      width={200}
      height={200}
      className="rounded-md"
      alt={`${broadInfo.broad_title} thumbnail`}
    />
    <p className="max-w-[200px] whitespace-pre-wrap text-xl">
      {broadInfo.broad_title}
    </p>
  </a>
);

const BjListItem = ({
  children,
  url,
  isOffline = false,
}: {
  children: React.ReactNode;
  url: string;
  isOffline?: boolean;
}) => (
  <li>
    <a
      href={url}
      className={`flex w-full items-center gap-x-2 rounded-md p-2 text-left transition-colors hover:bg-muted hover:no-underline ${isOffline ? "grayscale" : ""}`}
    >
      {children}
    </a>
  </li>
);

const LiveItem = React.memo(({ item }: { item: FavoriteItem }) => (
  <Tooltip delayDuration={0}>
    <TooltipTrigger className="w-full">
      <BjListItem url={item.broad_info[0].url}>
        <BjImage userId={item.user_id} />
        <div className="grow overflow-hidden">
          <h3 className="truncate text-xl font-semibold">{item.user_nick}</h3>
          <h4 className="truncate text-lg font-medium">
            {item.broad_info[0].broad_title}
          </h4>
          <p className="line-clamp-1 text-lg leading-none text-muted-foreground">
            {item.broad_info[0].category_tags.join(" / ")}
          </p>
        </div>
        <div className="ml-auto flex items-center gap-x-2 text-lg before:inline-block before:size-2 before:rounded-full before:bg-destructive">
          <span aria-label="시청자 수">
            {item.broad_info[0].total_view_cnt}
          </span>
        </div>
      </BjListItem>
    </TooltipTrigger>
    <TooltipContent side="right">
      <BroadPopover broadInfo={item.broad_info[0]} />
    </TooltipContent>
  </Tooltip>
));

LiveItem.displayName = "LiveItem";

const OfflineItem = React.memo(({ item }: { item: FavoriteItem }) => (
  <BjListItem url={`https://bj.afreecatv.com/${item.user_id}`} isOffline>
    <BjImage userId={item.user_id} />
    <div className="overflow-hidden">
      <h3 className="truncate text-xl font-semibold">{item.user_nick}</h3>
      <h4 className="truncate text-lg font-medium">오프라인</h4>
    </div>
  </BjListItem>
));

OfflineItem.displayName = "OfflineItem";

function Sidebar() {
  const { data, isError, isLoading, refetch } = useFetch("favorites");
  const isSmode = useHasSmode();
  const [live, offline] = data ? splitAndSortFavorites(data.data) : [[], []];

  return (
    <aside
      aria-label="BJ 목록"
      className={`
        scrollbar-thin scrollbar-rounded-full reset fixed z-10 h-[calc(100%-var(--gnb-height))] w-[226px] overflow-auto px-2 pb-4 text-foreground
        ${isSmode ? "translate-x-[-228px]" : ""}
        `}
    >
      <h2 className="mb-2 flex items-center text-lg font-bold">
        즐겨찾기
        <button
          aria-label="새로고침"
          className="ml-auto size-5"
          onClick={refetch}
        >
          <Icons.refresh />
        </button>
      </h2>
      {isLoading && <p>로딩 중...</p>}
      {isError && <p>로그인 정보를 확인해주세요.</p>}
      {(!data || data.data.length === 0) && <p>즐겨찾기한 BJ가 없습니다.</p>}
      <ul className="space-y-2">
        <TooltipProvider>
          {live.map((item) => (
            <LiveItem key={item.user_id} item={item} />
          ))}
        </TooltipProvider>
        {offline.map((item) => (
          <OfflineItem key={item.user_id} item={item} />
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
