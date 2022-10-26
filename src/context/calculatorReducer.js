export const calculatorReducer = (state, action) => {
    switch (action.type) {
        case 'readData':
            return {
                ...state,
                status: 'readed',
                equation: action.payload.equation,
                interval: action.payload.interval,
                objetiveError: action.payload.objetiveError,
                xArray: action.payload.xArray,
                yArray: action.payload.yArray,
            };
        case 'clearData':
            return {
                ...state,
                status: 'reading',
                equation: null,
                interval: null,
                objetiveError: null,
                xArray: null,
                yArray: null
            };

        default:
            return state;
    }
};
