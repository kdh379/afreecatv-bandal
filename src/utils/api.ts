import Browser from "webextension-polyfill";

export interface ApiDict {
  favorites: FavoriteResponse;
}

export type ApiKeys = keyof ApiDict;

export const apiMap: Record<keyof ApiDict, string> = {
  favorites: "https://myapi.afreecatv.com/api/favorite",
};

export async function actionFetch(url: string, options: RequestInit = {}) {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export function isErrorResponse(response: any): response is ErrorResponse {
  return "code" in response && "message" in response;
}

export async function api<T extends ApiKeys>(action: T): Promise<ApiDict[T]> {
  try {
    const response = await Browser.runtime.sendMessage({ action });

    if (response.success) return response.data;
    else {
      throw new Error(
        isErrorResponse(response.error)
          ? response.error.message
          : "알 수 없는 오류",
      );
    }
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
    throw error;
  }
}
