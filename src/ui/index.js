import { Button, SwipeCell, Cell, Card } from "vant";

const vant = {
  install: function (Vue) {
    // 标签栏
    Vue.use(Button).use(SwipeCell).use(Cell).use(Card);
  },
};

export default vant;
