import React, { useCallback, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";

const MoreOrLessText = ({ content, maxNumOfLines, textStyle }) => {
  const [isShowAll, setShowAll] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);
  const toggleShowMore = () => {
    setShowAll(!isShowAll);
  };

  const onTextLayout = useCallback((e) => {
    setLengthMore(e.nativeEvent.lines.length > maxNumOfLines);
  });

  return (
    <View style={textStyle}>
      <Text
        onTextLayout={onTextLayout}
        numberOfLines={isShowAll ? undefined : maxNumOfLines}
      >
        {content}
      </Text>
      {lengthMore ? (
        <Text
          onPress={toggleShowMore}
          style={{ color: "#000", fontWeight: "bold" }}
        >
          {isShowAll ? "See less" : "See more"}
        </Text>
      ) : null}
    </View>
  );
};

MoreOrLessText.defaultProps = {
  maxNumOfLines: 3,
};

export default MoreOrLessText;
