function control(path) {
	var req = new XMLHttpRequest();
	req.open('GET', path, true);
	req.send();
}