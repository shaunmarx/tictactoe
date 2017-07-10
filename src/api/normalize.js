import { normalize, schema } from 'normalizr';
import { curry } from 'ramda';

const user = new schema.Entity('users');

const game = new schema.Entity('games', {
    creatorUsername : user,
    opponentUsername: user
});

const curriedNormalize = curry((definition, data) => normalize(data, definition));

const normalizeData = curriedNormalize(game);
export default normalizeData;

