export function polarToEuclidean(distance, direction) {
    const shiftX = distance * Math.cos(direction);
    const shiftY = distance * Math.sin(direction);

    return { shiftX, shiftY };
}

export function hitWall(posX, posY, distance, direction, width, height) {
    const { shiftX, shiftY } = polarToEuclidean(distance, direction);

    const hitLeftWall = posX + shiftX < 0;
    if (hitLeftWall) {
        return 0;
    }

    const hitTopWall = posY + shiftY < 0;
    if (hitTopWall) {
        return 1;
    }

    const hitRightWall = posX + shiftX > width;
    if (hitRightWall) {
        return 2;
    }

    const hitBottomWall = posY + shiftY > height;
    if (hitBottomWall) {
        return 3;
    }

    return { shiftX, shiftY };
}

export function reflectFromLeftWall(distance, direction, posX, posY) {
    const distanceToWall = Math.abs(posX / Math.cos(direction));
    const remainingDistance = distance - distanceToWall;
    const reflectedDirection = direction - Math.PI;

    const shiftFromWall = polarToEuclidean(remainingDistance, reflectedDirection);

    const shiftX = shiftFromWall.shiftX - posX;
    const shiftY = distanceToWall * Math.sin(direction) - shiftFromWall.shiftY;

    return { shiftX, shiftY };
}

export function animateBall(options) {
    const distance = options.speed * options.stepTime / 1000;

    const wallHit = hitWall(
        options.posX, options.posY, distance, options.direction, options.width, options.height
    );

    if (typeof wallHit === 'object') {
        return wallHit;
    }

    if (wallHit === 0) {
        return reflectFromLeftWall(
            distance, options.direction, options.posX, options.posY
        );
    }

    if (wallHit === 1) {
        return reflectFromTopWall(
            options.posX, options.posY, shiftX, shiftY
        );
    }

    if (wallHit === 2) {
        return reflectFromRightWall(
            options.posX, options.posY, shiftX, shiftY
        );
    }

    if (wallHit === 3) {
        return reflectFromBottomWall(
            options.posX, options.posY, shiftX, shiftY
        );
    }

    return null;
}

