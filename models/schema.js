/**
 * Created by mp1pro on 12/12/18.
 */

let count = {
    nexttodoId: 1
};

const todo = {
    id: count.nexttodoId++,
    title: req.body.title,
    description: req.body.description
}

export default todo;
