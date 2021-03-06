#pragma strict

function Start () {
	if (this.gameObject.name == "Red") {
		transform.GetComponent.<Renderer>().material.color = Color(1, 0, 0); 
	}else if (this.gameObject.name == "Green") {
		transform.GetComponent.<Renderer>().material.color = Color(0, 1, 0); 
	}else if (this.gameObject.name == "Blue") {
		transform.GetComponent.<Renderer>().material.color = Color(0, 0, 1);
	}else if (this.gameObject.name == "Yellow") {
		transform.GetComponent.<Renderer>().material.color = Color(1, 1, 0); 
	}
}

function Update () {
	if (PlayerPrefs.GetInt("PlayerFailed") == 1) {
		Destroy(gameObject);
	}

	GetComponent.<Rigidbody>().velocity.y = -150 * Time.deltaTime;
}

function OnCollisionStay (col : Collision) {
	if (col.gameObject.name == this.gameObject.name && PlayerPrefs.GetInt("PlayerFailed") == 0) {
		PlayerPrefs.SetInt("CurrentScore", PlayerPrefs.GetInt("CurrentScore") + 1);
		Destroy(gameObject);
	}else {
		PlayerPrefs.SetInt("PlayerFailed", 1);
	}	
}
