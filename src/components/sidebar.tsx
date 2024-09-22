import React from "react";
import clsx from "clsx";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useFetch } from "@/hooks/useFetch";
import { splitAndSortFavorites } from "@/utils/favorites";
import { Icons } from "@/components/ui/icons";
import { useSidebarState } from "@/hooks/useSidebarState";

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
    <h3 className="text-lg font-bold">
      {broadInfo.user_nick}
      <span
        className={clsx(
          "before:inline-block before:size-2 font-normal before:mr-2 before:rounded-full before:bg-destructive",
          "ml-4 text-base text-muted-foreground",
        )}
      >
        {broadInfo.total_view_cnt}명
      </span>
    </h3>
    <p className="max-w-[200px] whitespace-pre-wrap text-xl font-medium">
      {broadInfo.broad_title}
    </p>
    <p className="text-lg font-medium text-muted-foreground">
      {broadInfo.category_tags.join(" / ")}
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
  <a
    href={url}
    className={clsx(
      "flex w-full items-center gap-x-2 rounded-md p-2 text-left transition-colors",
      "hover:bg-muted hover:no-underline",
      isOffline ? "grayscale" : "",
    )}
  >
    {children}
  </a>
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
        <div
          className={clsx(
            "before:inline-block before:size-2 before:rounded-full before:bg-destructive",
            "ml-auto flex items-center gap-x-2 text-lg",
          )}
        >
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
  const { isSmode, isExpanded, toggleSidebar } = useSidebarState();
  const [live, offline] = data ? splitAndSortFavorites(data.data) : [[], []];

  return (
    <aside
      aria-label="BJ 목록"
      className={clsx(
        "scrollbar-thin scrollbar-rounded-full reset transition-all",
        "fixed z-10 h-[calc(100vh-var(--gnb-height))] w-sidebar overflow-auto px-2 pb-4 text-foreground",
        isExpanded ? "w-sidebar" : "w-sidebar-collapsed",
        isSmode ? "-translate-x-sidebar" : "",
      )}
    >
      <div className="mb-2 flex items-center justify-between text-lg font-bold">
        {isExpanded && <h2>즐겨찾기</h2>}
        <div
          role="group"
          className={clsx(
            "flex gap-4 [&>button]:size-5",
            !isExpanded && "flex-col mx-auto [&>button]:size-6",
          )}
        >
          <button
            aria-label={isExpanded ? "사이드바 축소" : "사이드바 확장"}
            onClick={toggleSidebar}
          >
            {isExpanded ? (
              <Icons.arrowLeftToLine />
            ) : (
              <Icons.arrowRightToLine />
            )}
          </button>
          <button aria-label="새로고침" onClick={refetch}>
            <Icons.refresh />
          </button>
        </div>
      </div>
      {isLoading ? (
        <p>로딩 중...</p>
      ) : isError ? (
        <p>로그인 정보를 확인해주세요.</p>
      ) : !data || data.data.length === 0 ? (
        <p>즐겨찾기한 BJ가 없습니다.</p>
      ) : null}
      <div
        className={clsx(
          "space-y-2 overflow-hidden",
          !isExpanded && "[&_a]:!size-14",
        )}
      >
        <TooltipProvider>
          {live.map((item) => (
            <LiveItem key={item.user_id} item={item} />
          ))}
        </TooltipProvider>
        {offline.map((item) => (
          <OfflineItem key={item.user_id} item={item} />
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
