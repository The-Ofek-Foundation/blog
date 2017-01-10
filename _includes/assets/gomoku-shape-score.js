function gomoku_shape_score(consecutive, open_ends, curr_turn) {
  if (open_ends == 0 && consecutive < 5)
    return 0;
  switch (consecutive) {
    case 4:
      switch (open_ends) {
        case 1:
          if (curr_turn)
            return 100000000;
          return 50;
        case 2:
          if (curr_turn)
            return 100000000;
          return 500000;
      }
    case 3:
      switch (open_ends) {
        case 1:
          if (curr_turn)
            return 7;
          return 5;
        case 2:
          if (curr_turn)
            return 10000;
          return 50;
      }
    case 2:
      switch (open_ends) {
        case 1:
          return 2;
        case 2:
          return 5;
      }
    case 1:
      switch (open_ends) {
        case 1:
          return 0.5;
        case 2:
          return 1;
      }
    default:
      return 200000000;
  }
}
