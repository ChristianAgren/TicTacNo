import React, { memo } from "react";
import {
  StyleProp,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Col, ColProps } from "react-native-easy-grid";
import TicTacText from "../../text/Text";

export type TCellState = 0 | 1 | 2 | 3;
export type TCellPos = { y: number; x: number };

interface ICellProps extends ColProps {
  state: TCellState;
  pos: TCellPos;
  click: ({ y, x }: TCellPos, state: TCellState) => void;
}

interface ICellStyles {
  container: StyleProp<ViewStyle>;
  cell: StyleProp<ViewStyle>;
  0: StyleProp<ViewStyle>;
  1: StyleProp<ViewStyle>;
  2: StyleProp<ViewStyle>;
  3: StyleProp<ViewStyle>;
}

const Cell = ({ state, pos, ...props }: ICellProps) => {
  const style: ICellStyles = StyleSheet.create({
    container: {
      width: 60,
      height: 60,
    },
    cell: {
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "FredokaOne_400Regular",
      margin: 4,
      borderRadius: 10,
      borderWidth: 3,
      minWidth: 20,
      minHeight: 20,
      shadowOpacity: 1,
      shadowOffset: {
        width: -2,
        height: 2,
      },
      shadowRadius: 0,
    },
    0: {
      opacity: 0.33,
      elevation: 0,
      borderWidth: 0,
    },
    1: {
      borderColor: "#c1c1c1",
      backgroundColor: "#fff",
      shadowColor: "#c1c1c1",
    },
    2: {
      borderColor: "#BB2832",
      backgroundColor: "#fa5457",
      shadowColor: "#BB2832",
    },
    3: {
      borderColor: "#0B797D",
      backgroundColor: "#03D2DB",
      shadowColor: "#0B797D",
    },
  });

  const clickedCell = (state: TCellState) => {
    props.click(pos, state);
  };

  return (
    <TouchableOpacity
      style={style.container}
      onPress={() => state === 1 && clickedCell(3)}
    >
      <Col style={[style.cell, style[state]]} {...props}>
        <TicTacText centered color="#fff">
          {(state === 2 && "X") || (state === 3 && "O")}
        </TicTacText>
      </Col>
    </TouchableOpacity>
  );
};

export default memo(Cell);
