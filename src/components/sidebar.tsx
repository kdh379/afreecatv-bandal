import { useFetch } from "@/hooks/useFetch";

function Sidebar() {
  const { data, isError } = useFetch("fetchFavorites");

  return (
    <nav aria-label="BJ 목록" tabIndex={0}>
      <h2 className="text-xl font-bold">즐겨찾기</h2>
      {isError ? (
        <p>로그인 정보를 확인해주세요.</p>
      ) : (
        <ul>
          {data?.data.map((item) => (
            <li key={item.user_id}>
              <a href="#">{item.user_nick}</a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

export default Sidebar;
