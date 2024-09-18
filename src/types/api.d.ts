interface ErrorResponse {
  code: string;
  message: string;
}

interface SuccessResponseBase {
  pool_check: string;
}

type SuccessResponse<T extends ActionKey> = SuccessResponseBase & {
  data: ActionData[T];
};
