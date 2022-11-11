import React, { useState } from "react";
import { Transport } from "../FirmwareJS/webserial";
import { ESPLoader } from "../FirmwareJS/ESPLoader";

import banner_img from "../assets/main-banner-pic.png";
import file1 from "../bin/bootloader.bin";
import file2 from "../bin/partition-table.bin";
import file3 from "../bin/ZINGV1_CLEAN.bin";

import "./MainPage.css";

function MainPage() {
	const [console, setConsole] = useState("");

	const readFile = () => {
		var reader = new FileReader();

		reader.readAsBinaryString(file1);
	};

	const handleConnect = async () => {
		//    device = await navigator.usb.requestDevice({
		//        filters: [{ vendorId: 0x10c4 }]
		//    });

		try {
			let device = await navigator.serial.requestPort({});
			setConsole("Trying to connect ...");
			let transport = new Transport(device);
			// console.log(device);

			// 921600, 460800, 230400, 115200
			const baudrate = 115200;

			let esploader = new ESPLoader(transport, baudrate);

			let chip = await esploader.main_fn();
			setConsole("connected");
		} catch (e) {
			// console.error(e);
			setConsole(`Error: ${e.message}`);
		}
	};

	const handleUpdate = async () => {};

	return (
		<div className="main-container">
			<div className="left-col">
				<p className="heading-text">Firmware Update</p>
				<div className="main-btn-group">
					<button onClick={handleConnect}>CONNECT</button>
					<button className="update-btn" onClick={handleUpdate}>
						UPDATE
					</button>
				</div>
				<textarea
					className="console-box"
					name="console"
					value={console}
					disabled
				></textarea>
			</div>
			<div className="right-col">
				<img
					className="banner-pic"
					src={banner_img}
					alt="Play computer main banner image"
				/>
			</div>
		</div>
	);
}

export default MainPage;
