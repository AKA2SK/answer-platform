import Taro, { useLaunch } from "@tarojs/taro";
import { PropsWithChildren } from "react";
import "taro-ui/dist/style/index.scss";
import "./app.scss";

function App({ children }: PropsWithChildren) {
  useLaunch(async () => {
    const res = await Taro.login();

    console.log(res);
  });

  return children;
}

export default App;
