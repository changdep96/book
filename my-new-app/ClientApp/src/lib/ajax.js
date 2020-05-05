const callAjax = store => next => action => {
    console.log('call ajax', store, action)
    if (action.url) {
        return processAjax(store, action);
    }
    else {
        return next(action);
    }
}

function processAjax(store, action) {
    console.log('process ajax', store, action);
    const account = store.getState().account || {};

    return fetch(action.url, {
        method: action.method,
        headers: {
            "content-type": "application/json",
            "Authorization": 'Bearer ' + account.token
        },
        body: action.data ? JSON.stringify(action.data) : null
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                if (action.onError) {
                    store.dispatch({
                        type: action.onError,
                        ...data
                    })
                }
            }
            else {
                if (action.onSuccess) {
                    store.dispatch({
                        type: action.onSuccess,
                        ...data
                    })
                }
            }
            return data;
        })
        .catch(error => {
            if (action.onError) {
                store.dispatch({
                    type: action.onError,
                    ...error
                })
            }
            return error;
        })
}

export default callAjax;