export function splitAndSortFavorites(
  data: FavoriteItem[],
): [FavoriteItem[], FavoriteItem[]] {
  const live = data
    .filter((item) => item.is_live)
    .sort(
      (a, b) =>
        (b.broad_info[0]?.total_view_cnt || 0) -
        (a.broad_info[0]?.total_view_cnt || 0),
    );

  const offline = data
    .filter((item) => !item.is_live)
    .sort((a, b) => a.user_nick.localeCompare(b.user_nick, "ko"));

  return [live, offline];
}
