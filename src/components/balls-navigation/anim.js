import { navWidth, navHeight, ballRadius } from '../../constants/styles';

const WALL_LEFT = 0;
const WALL_TOP = 1;
const WALL_RIGHT = 2;
const WALL_BOTTOM = 3;

export const polarToEuclidean = (distance, direction) => ([
    distance * Math.cos(direction),
    distance * Math.sin(direction)
]);

export function getHitWall({ posX, posY, direction }, distance) {
    // return a status (if a wall was hit) or a position (otherwise)

    // get the next position of the ball, supposing that the ball
    // can travel through walls
    const [shiftX, shiftY] = polarToEuclidean(distance, direction);

    const hitLeftWall = posX + shiftX < ballRadius;
    if (hitLeftWall) {
        return WALL_LEFT;
    }

    const hitTopWall = posY + shiftY < ballRadius;
    if (hitTopWall) {
        return WALL_TOP;
    }

    const hitRightWall = posX + shiftX > navWidth - ballRadius;
    if (hitRightWall) {
        return WALL_RIGHT;
    }

    const hitBottomWall = posY + shiftY > navHeight - ballRadius;
    if (hitBottomWall) {
        return WALL_BOTTOM;
    }

    return [posX + shiftX, posY + shiftY];
}

export function reflectFromWall({ distance, distanceToWall, ...state }) {
    const remainingDistance = distance - distanceToWall;

    // eslint-disable-next-line no-use-before-define
    return animateBall(state, remainingDistance);
}

const reflectFromWallHorizontal = ({ direction, ...state }) => reflectFromWall({
    direction: Math.PI - direction,
    ...state
});

const reflectFromWallVertical = ({ direction, ...state }) => reflectFromWall({
    direction: 2 * Math.PI - direction,
    ...state
});

export function reflectFromLeftWall({ posX, posY, direction, ...state }, distance) {
    const distanceToWall = Math.abs((posX - ballRadius) / Math.cos(direction));
    const fromPosX = ballRadius;
    const fromPosY = posY + distanceToWall * Math.sin(direction);

    return reflectFromWallHorizontal({
        ...state,
        direction,
        distance,
        distanceToWall,
        posX: fromPosX,
        posY: fromPosY
    });
}

export function reflectFromRightWall({ posX, posY, direction, ...state }, distance) {
    const distanceToWall = Math.abs((navWidth - posX - ballRadius) / Math.cos(direction));

    const fromPosX = navWidth - ballRadius;
    const fromPosY = posY + distanceToWall * Math.sin(direction);

    return reflectFromWallHorizontal({
        ...state,
        direction,
        distance,
        distanceToWall,
        posX: fromPosX,
        posY: fromPosY
    });
}

export function reflectFromTopWall({ posX, posY, direction, ...state }, distance) {
    const distanceToWall = Math.abs((posY - ballRadius) / Math.sin(direction));

    const fromPosX = posX + distanceToWall * Math.cos(direction);
    const fromPosY = ballRadius;

    return reflectFromWallVertical({
        ...state,
        direction,
        distance,
        distanceToWall,
        posX: fromPosX,
        posY: fromPosY
    });
}

export function reflectFromBottomWall({ posX, posY, direction, ...state }, distance) {
    const distanceToWall = Math.abs((navHeight - posY - ballRadius) / Math.sin(direction));

    const fromPosX = posX + distanceToWall * Math.cos(direction);
    const fromPosY = navHeight - ballRadius;

    return reflectFromWallVertical({
        ...state,
        direction,
        distance,
        distanceToWall,
        posX: fromPosX,
        posY: fromPosY
    });
}

export function animateBall(state, distance = null) {
    const totalDistance = distance || state.speed * state.stepTime / 1000;

    const wallHit = getHitWall(state, totalDistance);

    if (wallHit === WALL_LEFT) {
        return reflectFromLeftWall(state, totalDistance);
    }

    if (wallHit === WALL_TOP) {
        return reflectFromTopWall(state, totalDistance);
    }

    if (wallHit === WALL_RIGHT) {
        return reflectFromRightWall(state, totalDistance);
    }

    if (wallHit === WALL_BOTTOM) {
        return reflectFromBottomWall(state, totalDistance);
    }

    // if we reached here, the ball didn't hit a wall
    const [newPosX, newPosY] = wallHit;

    return {
        posX: newPosX,
        posY: newPosY,
        direction: state.direction
    };
}

