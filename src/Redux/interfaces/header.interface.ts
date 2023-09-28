export interface IHeaderProps {
  isAuthorized: boolean;
  name?: string;
  logoutThunk(): void;
}
