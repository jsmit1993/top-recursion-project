function getValidMoves([x,y]) {
    const offsets = [[1,2], [2,2],[2,-1], [-2,1], [-2,-1], [1,-2], [-1,2], [-1,-2]];

    const validMoves = [];

    for (const [dx, dy] of offsets) {
        const newX = x + dx;
        const newY = y + dy;

        if (newX >= 0 && newX <= 7 && newY >= 0 && newY <= 7) {
            validMoves.push([newX, newY]);
        }
    }
    return validMoves;
}

function knightMoves(start, target) {
    if (start[0] === target[0] && start[1] === target[1]) {
        console.log("You made it in 0 moves");
        return [start];
    }

    const queue = [[start]];

    const visited = new Set();
    visited.add(start.toString());

    while (queue.length > 0) {
        const currentPath = queue.shift();
        const currentSquare = currentPath[currentPath.length - 1];

        const nextMoves = getValidMoves(currentSquare);

        for (const move of nextMoves) {
            const moveStr = move.toString();
            if (!visited.has(moveStr)) {
                const newPath = [...currentPath, move];
                if (move[0] === target[0] && move[1] === target[1]) {
                    console.log(`You made it in ${newPath.length - 1} moves! Here's your path:`);
                    newPath.forEach(pos => console.log(pos));
                    return newPath;
                }
                visited.add(moveStr);
                queue.push(newPath);
            }
        }
    }
}

knightMoves([0,0], [5,4]);