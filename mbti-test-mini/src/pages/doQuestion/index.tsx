/**
 * doQuestionPage 组件：实现一个简单的答题页面。
 * 该组件没有接收任何参数，通过 useState 和 useEffect 钩子管理当前题目和页面状态。
 * 使用 AtRadio 组件呈现选项，通过按钮控制题目切换和查看结果。
 *
 * @returns 返回答题页面的 JSX 元素。
 */
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtButton, AtProgress, AtRadio } from "taro-ui";
import { useEffect, useState } from "react";
import "taro-ui/dist/style/components/button.scss"; // 按需引入答题页面样式
import "./index.scss";
import GlobalFooter from "../../components/GlobalFooter";
import questions from "../../data/question.json";

export default () => {
  // 管理当前题目状态
  const [currentQuestion, setCurrentQuestion] = useState<Question>(
    questions[0]
  );
  // 将当前题目的选项转换为 AtRadio 组件需要的格式
  const questionOptions = currentQuestion.options.map((option) => {
    return {
      label: `${option.key}. ${option.value}`,
      value: option.key,
    };
  });
  // 管理当前题目序号
  const [current, setCurrent] = useState<number>(1);
  // 管理用户选择的答案
  const [currentAnswer, setCurrentAnswer] = useState<string>("");
  // 管理回答列表
  const [answerList] = useState<string[]>([]);

  // 当当前题目序号变化时，更新当前题目状态
  useEffect(() => {
    setCurrentQuestion(questions[current - 1]);
    setCurrentAnswer(answerList[current - 1] || "");
  }, [current]);

  // 渲染页面 JSX
  return (
    <View className="doQuestionPage">
      <View className="at-article__h2 title">
        {current}、{currentQuestion.title}{" "}
      </View>
      <View className="options-wrapper">
        <AtRadio
          options={questionOptions}
          value={currentAnswer}
          onClick={(value) => {
            setCurrentAnswer(value);
            answerList[current - 1] = value;
          }}
        />
      </View>
      {current < questions.length && (
        <AtButton
          type="primary"
          className="controlBtn"
          disabled={!currentAnswer}
          circle
          onClick={() => setCurrent(current + 1)}
        >
          下一题
        </AtButton>
      )}
      {current > 1 && (
        <AtButton
          type="primary"
          className="controlBtn"
          circle
          onClick={() => setCurrent(current - 1)}
        >
          上一题
        </AtButton>
      )}
      {current === questions.length && (
        <AtButton
          type="primary"
          className="controlBtn"
          circle
          disabled={!currentAnswer}
          onClick={() => {
            // 传递答案
            Taro.setStorageSync("answerList", answerList);
            // 跳转到结果页面
            Taro.navigateTo({
              url: "/pages/result/index",
            });
          }}
        >
          查看结果
        </AtButton>
      )}
      <AtProgress
        className="progress-wrapper"
        // percent={Math.round(current / questions.length) * 100}
        strokeWidth={10}
        status={current === questions.length ? "success" : "progress"}
      />
      <GlobalFooter />
    </View>
  );
};
