const items = require('./items');

function withDrawMoney(amount) {
    
    const createTime = new Date().toISOString();
    console.log(`Start: ${createTime}`);

    let nItem = items[0];
    if (items.length == 0) {
        nItem = {
            completed: 1,
            tCreated: createTime,
            tUpd1: createTime,
            tUpd2: createTime,
            tEnd: createTime
        };
    } else {
        nItem = {
            ...items[0],
            tCreated: createTime,
        };
    } items[0] = nItem;
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (amount > 1000) {
                const createdAt = new Date().toISOString();
                items[0].tUpd1 = createdAt;
                items[0].tUpd2 = 0;
                items[0].completed = 0;
                reject(new Error(`Not enough money to withdraw ${createdAt}`))
            }
            const time = new Date().toISOString();
            console.log(`resolve 1: ${time}`);

            items[0].tUpd1 = time;

            resolve(amount)
        }, 1000);
    });
}

function buyCinemaTicket(money) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (money < 10) {
                const createdAt = new Date().toISOString();
                items[0].tUpd2 = createdAt;
                items[0].tEnd = 0;
                items[0].completed = 0;
                reject(new Error(`not enough money to buy ticket ${createdAt}`))
            }

            const time = new Date().toISOString();
            console.log(`resolve 2: ${time}`);

            items[0].tUpd2 = time;

            resolve('ticket-1')
        }, 1000);
    });
}

function goInsideCinema(ticket) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!ticket) {
                const createdAt = new Date().toISOString();
                items[0].tEnd = createdAt;
                items[0].completed = 0;
                reject(new Error(`no ticket ${createdAt}`))
            }

            const time = new Date().toISOString();
            items[0].tEnd = time;

            resolve(`enjoy the movie ${time}`)
        }, 1000);
    });
}

async function watchMovie(amount) {
    try {
        const money = await withDrawMoney(amount);
        const ticket = await buyCinemaTicket(money);
        const result = await goInsideCinema(ticket);

        return result;
    } catch (error) {
        throw error;
    }
}

const defaultFunction = (request) => {
    const { val } = request.params;

    watchMovie(val)
        .then((result) => console.log(result))
        .catch((error) => console.log(error));

    return {
        status: 'success',
        data: {
            items,
        },
    };
};

module.exports = { defaultFunction };
