

void setup() {
 Serial.begin(9600);  
 pinMode(5, OUTPUT); 
 pinMode(6, OUTPUT);
 pinMode(7, OUTPUT);
 pinMode(8, OUTPUT);
 pinMode(9, OUTPUT);
 
         
}
 
void loop() {
 if (Serial.available() > 0) { // if there's serial data available
 int inByte = Serial.read();   // read it
 Serial.write(inByte);         // send it back out as raw binary data
 analogWrite(5, inByte);       // use it to set the LED brightness
 analogWrite(6, inByte);
 analogWrite(7, inByte);
 analogWrite(8, inByte);
 analogWrite(9, inByte);

 }
}

