#pragma strict
var Title : UnityEngine.UI.Text;
var Instructions : UnityEngine.UI.Text;
var Score_Current : UnityEngine.UI.Text;
var Score_High : UnityEngine.UI.Text;

var Cube_Rotate : GameObject;
var Turning : boolean;
var Ball_Template : GameObject;
var Ball_Spawn : GameObject;

var Game_Status : boolean;
var Spawning : boolean;

function Start () {
	Title.text = "C o l o r  C a t c h e r";
	Instructions.text = "T a p  t o  s t a r t";
	Score_Current.text = "";
	Game_Status = false;
	PlayerPrefs.SetInt("PlayerFailed", 0);
	PlayerPrefs.SetInt("CurrentScore", 0);
}

function Update () {
	if (Game_Status == true && PlayerPrefs.GetInt("PlayerFailed") == 1) {
		Game_Status = false;
		Title.text = "Y O U  F A I L E D";
		Instructions.text = "T a p  t o  t r y  a g a i n";
	}

	if (Input.GetMouseButtonDown(0) && PlayerPrefs.GetInt("PlayerFailed") == 1) {
		PlayerPrefs.SetInt("PlayerFailed", 0);
		PlayerPrefs.SetInt("CurrentScore", 0);
		Title.text = "";
		Instructions.text = "";
		Game_Status = true;
		Spawning_Circles();
	}else if (Input.GetMouseButtonDown(0) && Game_Status == false) {
		Title.text = "";
		Instructions.text = "";
		PlayerPrefs.SetInt("CurrentScore", 0);
		Game_Status = true;
		Spawning_Circles();
	}else if (Input.GetMouseButtonDown(0) && Game_Status == true) {
		Rotate();
	}

	if (Game_Status == true) {
		Score_Current.text = "Current Score: " + PlayerPrefs.GetInt("CurrentScore");
	}

	if (PlayerPrefs.GetInt("CurrentScore") > PlayerPrefs.GetInt("BestScore")) {
		PlayerPrefs.SetInt("BestScore", PlayerPrefs.GetInt("CurrentScore"));
	}
	Score_High.text = "Best Score: " + PlayerPrefs.GetInt("BestScore");
}

function Spawning_Circles () {
	while (Game_Status == true && PlayerPrefs.GetInt("PlayerFailed") == 0) {
		if (Spawning == false) {
			Spawning = true;
			var Spot : float = Random.Range(1, 3);
			if (Spot == 1) {
				Spot = -.5;
			}else if (Spot == 2) {
				Spot = .5;
			}
			Ball_Spawn = Instantiate(Ball_Template, new Vector3 (Spot, 6, 0),  Quaternion.identity);
			var Identity : int = Random.Range(1, 5);
			if (Identity == 1) {
				Ball_Spawn.name = "Red";
			}else if (Identity == 2) {
				Ball_Spawn.name = "Green";
			}else if (Identity == 3) {
				Ball_Spawn.name = "Blue";
			}else if (Identity == 4) {
				Ball_Spawn.name = "Yellow";
			}
			yield WaitForSeconds (Random.Range(1.0f, 3.0f));
			Spawning = false;
		}else {
			return;
		}
	}
}

function Rotate () {
	if (Turning == false) {
		Turning = true;
		var Counting : int = 0;
		while (Counting < 9) {
			Cube_Rotate.transform.rotation = Quaternion.Euler(0, 0, Cube_Rotate.transform.rotation.eulerAngles.z - 10);
			Counting++;
			yield WaitForSeconds (.025);
		}
		Turning = false;
	}
}