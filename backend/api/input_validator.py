def is_valid_number(id):
    if id and id is not None and int(id):
        return True
    return False

def is_valid_points(points):
    if points and points is not None:
        if is_valid_number(points) and int(points) >= 0 and int(points) <= 100:
            return True
    return False