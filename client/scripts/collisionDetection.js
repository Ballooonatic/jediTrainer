function saberDroneCollision() {

    let distance = {}

    distance.x = Math.abs(drone.x - saber.x);
    distance.y = Math.abs(drone.y - (saber.y + (saber.height * -0.2))); // making up for the anchor offset

    if (distance.x > (saber.width / 2 + drone.radius)) { return false; }
    if (distance.y > (saber.height / 2 + drone.radius)) { return false; }

    if (distance.x <= (saber.width / 2)) { return true; } 
    if (distance.y <= (saber.height / 2)) { return true; }

    cornerDistance_sq = (distance.x - saber.width / 2) ** 2 + (distance.y - saber.height / 2) ** 2;

    return (cornerDistance_sq <= (drone.radius ** 2));
}