import { lazy } from "react";
import { useUserStore } from "./store/user";
import Api from "./api";

const App = lazy(async () => {
  try {
    if (useUserStore.getState()?.tk) {
      const res = await Api.get("/common/data");
      useUserStore.setState(res?.data);
    }
  } catch (error) {
    console.log(error);
  }

  return import("./Routes");
});

export default App;
