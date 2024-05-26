import { Image, View } from "@tarojs/components";
import { AtButton } from "taro-ui";

import Taro from "@tarojs/taro";
import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "./index.scss";
import GlobalFooter from "../../components/GlobalFooter";
import headerBg from "../../assets/headerBg.png";
import { getBestQuestionResult } from "../../utils/bizUtils";
import questions from "../../data/question.json";
import questionResults from "../../data/question_results.json";

export default () => {
  const answerList = Taro.getStorageSync("answerList");
  if (!answerList || answerList.length === 0) {
    Taro.showToast({
      title: "请先完成测试",
      icon: "error",
      duration: 3000,
    });
  }

  const result = getBestQuestionResult(answerList, questions, questionResults);

  return (
    <View className="resultPage">
      <View className="at-article__h1 title">{result.resultName}</View>
      <View className="at-article__h3 subTitle">{result.resultDesc}</View>
      <AtButton
        type="primary"
        size="normal"
        className="enterBtn"
        circle
        onClick={() => {
          Taro.reLaunch({
            url: "/pages/index/index",
          });
        }}
      >
        返回主页
      </AtButton>
      <Image
        src={headerBg}
        style={{ width: "100%", height: "100vh" }}
        mode="aspectFill"
      />
      <GlobalFooter />
    </View>
  );
};
