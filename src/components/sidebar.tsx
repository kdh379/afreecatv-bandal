import { useFetch } from "@/hooks/useFetch";
import { splitAndSortFavorites } from "@/utils/favorites";

function LiveBJList({ items }: { items: FavoriteItem[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.user_id}>
          <a
            href={item.broad_info[0].url}
            className="flex items-center gap-x-3"
          >
            <img
              src={`https://stimg.afreecatv.com/LOGO/${item.user_id.slice(0, 2)}/${item.user_id}/m/${item.user_id}.webp`}
              width={25}
              height={25}
              className="size-10 rounded-full"
            />
            <div>
              <p className="text-xl font-semibold">{item.user_nick}</p>
              <p className="line-clamp-1 text-lg">
                {item.broad_info[0].category_tags.map(String).join(" / ")}
              </p>
            </div>
            <div className="ml-auto flex items-center gap-x-2 before:inline-block before:size-3 before:rounded-full before:bg-red-500">
              <span aria-label="시청자 수">
                {item.broad_info[0].total_view_cnt}
              </span>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}

function OfflineBJList({ items }: { items: FavoriteItem[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.user_id}>
          <div>{item.user_nick}</div>
        </li>
      ))}
    </ul>
  );
}

function Sidebar() {
  const { data, isError } = useFetch("favorites");

  const [live, offline] = data ? splitAndSortFavorites(data.data) : [[], []];

  return (
    <nav aria-label="BJ 목록" tabIndex={0} className="px-4">
      <h2 className="mb-2 text-lg font-bold">즐겨찾기</h2>
      {isError ? (
        <p>로그인 정보를 확인해주세요.</p>
      ) : !data || data.data.length === 0 ? (
        <p>즐겨찾기한 BJ가 없습니다.</p>
      ) : (
        <ul>
          {live.length > 0 && <LiveBJList items={live} />}
          {offline.length > 0 && <OfflineBJList items={offline} />}
        </ul>
      )}
    </nav>
  );
}

export default Sidebar;
