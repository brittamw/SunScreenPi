from socketIO_client import SocketIO,BaseNamespace     #SocketIO-Bibliothek wird importiert
import spidev                                          #importSchnittstelee SPI
import RPi.GPIO as GPIO                                # GPIO Bibliothek importieren
import time                                            #Modul time importieren
from datetime import datetime,date                     #Modul datetime importieren

heute = date.fromtimestamp(time.time())                # heute mit derzeitigem Datum definieren
print heute                                            #Ausgabe heute

spi = spidev.SpiDev()                                  #Schnittstellenreferenz
spi.open(0,1)                                          #Schnittstelle 0 oeffnen device 1

socket = SocketIO(‘192.168.0.193.’,3000)               #Serverzuweisung (lokale Testumgebung)
socketIO =socket.define (BaseNamespace,“/sunscreenpi“)

l={}                                                   #Dictionary – Liste erstellen

while True                                             #solange Werte vom Sensor kommen
	Byte0 = 0x01                                                          #Bits setzen passend zum Datenblatt
	Byte1 = 0x80
	Byte2 = 0x00
	print (‘0x%02X 0x%02X 0x%02X’%(Byte0,Byte1,Byte2))                    #Bit Ausgabe
	data = spi.xfer2 ([Byte0, Byte1, Byte2])                              #senden und empfangen

	wert = data [1]  & 0x03                                               #data 1 kommt von Byte 1
	wert = wert << 8                                                      # wird um 8 Stellen nach links geschoben
	wert = wert + (data[2])
	spannung = (wert * 3,22265625)                                        #digitale Werte in Spannung umrechnen
	UV_Index = (spannung/100.0)                                           #UV-Index berechnen

	print data,“   “,wert,“   “,“Spannungswert:“ “%.2f“%spannung,“   “,“UV-Index“ “%.0f“%UV_Index    # Ausgabe der gerundeten Werte
	l[int(time.time())] =“%.2f”%UV_Index                       #Übergabe der UV-Werte mit timestamp in die Liste
	print l                                                    #Ausgabe der Liste l
	socketIO.emit(‘SunScreenPi’, l)                            #sendet aktuelle Liste an den Server
	time.sleep(6.0)                                            #Werte werden alle 6 Sekunden vom Sensor abgegriffen
	if heute !=date.fromtimestamp(time.time()):                #Löschen der Liste
	l = {}
	heute = date.fromtimestamp(time.time())

spi.close()                                                    #SPI-Schnittstelle schließen


