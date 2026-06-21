export const defineGridPadding = (width) => {
    const gridPadding = width * 0.05;
    return gridPadding > 0 ? gridPadding : 1
}