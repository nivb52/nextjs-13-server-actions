type ReturnsBool = (arg0: Error | any) => Boolean
export interface RetryAsyncParam {
    fn: Function
    times: number;
    retryCondition(arg0: Error): Boolean;
}

export const retryAsync = async (fn: Function, times = 5, retryCondition: ReturnsBool) => {
    if (times < 1) {
        throw new Error(`retryAsync, Bad argument: 'times' must be greater than 0, but ${times} was received.`);
    } else if (typeof fn !== 'function') {
        throw new Error(`retryAsync, Bad argument: 'fn' must be typeof function, but ${typeof fn} was received.`);
    }

    let attemptCount = 0
    while (true) {
        try {
            return await fn();
        } catch (err) {
            attemptCount++;
            if (attemptCount >= times) throw err;
            if (retryCondition && typeof retryCondition === 'function' && retryCondition(err)) {
                throw err
            }
        }
    }
}

export const retryQuery = async (fn: Function, times = 5) => {
    if (times < 1) {
        throw new Error(`retryAsync, Bad argument: 'times' must be greater than 0, but ${times} was received.`);
    } else if (typeof fn !== 'function') {
        throw new Error(`retryAsync, Bad argument: 'fn' must be typeof function, but ${typeof fn} was received.`);
    }

    let attemptCount = 0
    while (true) {
        try {
            return await fn()
        } catch (err) {
            attemptCount++;
            if (attemptCount >= times) throw err;
            if (err instanceof Error && err.message.search(`Can't reach database server`) === -1) {
                throw err
            }
        }
    }
}


