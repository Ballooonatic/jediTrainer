function saberDroneCollision() {

    let saberOriginX = saber.x - (saber.width / 2)
    let saberOriginY = saber.y - (saber.height * 0.7)

    let saberCenterX = saber.x
    let saberCenterY = saber.y

    // Rotate circle's center point back
    let unrotatedCircleX = Math.cos(-saber.rotation) * (drone.x - saberCenterX) - Math.sin(-saber.rotation) * (drone.y - saberCenterY) + saberCenterX;
    let unrotatedCircleY = Math.sin(-saber.rotation) * (drone.x - saberCenterX) + Math.cos(-saber.rotation) * (drone.y - saberCenterY) + saberCenterY;
    
    // Closest point in the rectangle to the center of circle rotated backwards(unrotated)
    let closestX, closestY;
    
    // Find the unrotated closest x point from center of unrotated circle
    if (unrotatedCircleX  < saberOriginX) {
        closestX = saberOriginX;
    }
    else if (unrotatedCircleX  > saberOriginX + saber.width) { 
        closestX = saberOriginX + saber.width;
    }
    else {
        closestX = unrotatedCircleX ;
    }
    
    // Find the unrotated closest y point from center of unrotated circle
    if (unrotatedCircleY < saberOriginY) {
        closestY = saberOriginY;
    }
    else if (unrotatedCircleY > saberOriginY + saber.height) {
        closestY = saberOriginY + saber.height;
    }
    else {
        closestY = unrotatedCircleY;
    }
    
    // Determine collision
    let collision = false;
    
    let distance = findDistance(unrotatedCircleX , unrotatedCircleY, closestX, closestY);
    if (distance < drone.radius) {
        collision = true; // Collision
    }
    else {
        collision = false;
    }

    return collision;
}

function findDistance(fromX, fromY, toX, toY) {
    let a = Math.abs(fromX - toX);
    let b = Math.abs(fromY - toY);
 
    return Math.sqrt((a * a) + (b * b));
}