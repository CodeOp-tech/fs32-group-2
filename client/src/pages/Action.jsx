import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import "../Action.css";
import { useCountdown } from "../hooks/useCountdown";
import { Tabs, Tab } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../components/NavBar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Noty from "noty";
import "../../node_modules/noty/lib/noty.css";
import "../../node_modules/noty/lib/themes/mint.css";

export default function Action() {
	// console.log("Component re-rendered");
	const [oneAction, setOneAction] = useState({});
	const { ActionId } = useParams();
	const [requirements, setRequirements] = useState([]);
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);

	let navigate = useNavigate();

	useEffect(() => {
		displayOneAction();
	}, [ActionId]);

	useEffect(() => {
		console.log(oneAction);
	}, [oneAction]);

	async function displayOneAction() {
		try {
			const response = await fetch(`/api/actions/${ActionId}`);
			if (!response.ok) {
				throw new Error("Oops, something went wrong");
			}
			const data = await response.json();
			console.log(data.name);
			setOneAction(data);
		} catch (error) {
			console.log(error);
		}
	}

	const targetDate = new Date(oneAction.end_time).getTime();

	const { days, hours, minutes, seconds } = useCountdown(targetDate);

	const startTime = new Date(oneAction.start_time).toLocaleDateString("en-UK", {
		day: "numeric",
		month: "long",
		year: "numeric",
		hour: "numeric",
		minute: "numeric",
	});

	const endTime = new Date(oneAction.end_time).toLocaleDateString("en-UK", {
		day: "numeric",
		month: "long",
		year: "numeric",
		hour: "numeric",
		minute: "numeric",
	});

	// adding requirement and user id to volunteership table
	async function addVolunteerships() {
		try {
			console.log("posting");
			const data = await fetch(`/api/users/profile/volunteerships`, {
				method: "POST",
				body: JSON.stringify({ requirements }),
				headers: {
					authorization: "Bearer " + localStorage.getItem("token"),
					"Content-Type": "application/json",
				},
			});
			console.log("returned by post:");
			console.log(data);
			// show notification
			new Noty({
				text: "Joined successfully!",
				type: "success",
				layout: "topRight",
				timeout: 3000,
			}).show();
		} catch (error) {
			console.log(error);
		}
	}

	let check = 0;
	function handleCheckboxChange(e) {
		console.log(e);
		if (e.target.checked) {
			setRequirements((r) => [...r, e.target.value]);
			check = 1;
		} else {
			setRequirements((r) => r.filter((req) => req !== e.target.value));
			check = 0;
		}
		console.log(check);
	}

	// users to join events with the requirements selected
	const handleClick = () => {
		addVolunteerships();
		//setShowSuccessMessage(true);
		// THIS IS NEWWW
		// alert("Joined successfully!");
		closeModal();
	};

	function closeModal() {
		setShow(false);
		setTimeout(() => {
			navigate("/Actions");
			//setShowSuccessMessage(false); // Reset the success message state when closing the modal
		}, 1000);
	}
	const [show, setShow] = useState(true);

	return (
		<div>
			<Modal
				show={show}
				onHide={closeModal}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered>
				<Modal.Header closeButton>
					<Modal.Title>{oneAction.name}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div>
						<div className="actioncontainer-css">
							<div className="tabs">
								<Tabs defaultActiveKey="description" id="tabs">
									<Tab
										eventKey="description"
										title="Description"
										className="actionTabContent-css ">
										<p>{oneAction.description}</p>
										<br></br>
										{oneAction.Keywords && (
											<div className="keywordBadges">
												<ul>
													{oneAction.Keywords.map((keyword) => (
														<li className="badge bg-primary" key={keyword.id}>
															{keyword.keyword}
														</li>
													))}
												</ul>
											</div>
										)}
									</Tab>

									<Tab
										eventKey="location"
										title="Location"
										className="actionTabContent-css ">
										<div>
											<div className="container">
												{!oneAction.in_person &&
													!oneAction.online &&
													"Anywhere!"}
												{oneAction.online && !oneAction.in_person && (
													<div>Follow this link: {oneAction.online_link}</div>
												)}
												{oneAction.in_person && !oneAction.online && (
													<div>Location: {oneAction.city}</div>
												)}
												{oneAction.in_person && oneAction.online && (
													<>
														<div>Location: {oneAction.city}</div>
														<div>Follow this link: {oneAction.online_link}</div>
													</>
												)}
												<div>
													{oneAction.start_time
														? `Start time: ${startTime}`
														: "Take as long as you want!"}{" "}
													<br></br>
													{oneAction.end_time
														? `End time: ${endTime}`
														: ""}{" "}
												</div>{" "}
											</div>{" "}
										</div>
									</Tab>

									<Tab
										eventKey="requirements"
										title="Requirements"
										className="actionTabContent-css">
										<h4>What do you want to do?</h4>
										<br></br>
										{oneAction.Requirements &&
											oneAction.Requirements.length > 0 && (
												<div className="container">
													{oneAction.Requirements.map((requirement) => (
														<div key={requirement.id}>
															<div className="row">
																<div className="col-6">
																	{requirement.description}
																</div>
																<div className="col-2">
																	<input
																		disabled={
																			requirement.Users.length ===
																			requirement.capacity
																		}
																		value={requirement.id}
																		type="checkbox"
																		checked={
																			requirements.includes(requirement.id)
																				? "checked"
																				: null
																		}
																		onChange={handleCheckboxChange}
																	/>
																</div>
																{/*showing the capacity*/}
																<div className="col-2">
																	{`${requirement.Users.length + check} / ${
																		requirement.capacity
																	}`}
																</div>

																<div className="col-2">
																	{/*
													{requirement.Volunteerships &&
														requirement.Volunteerships.length > 0 && (
															<div>
																Volunteers:{" "}
																{requirement.Volunteerships.map(
																	(volunteership) => (
																		<div key={volunteership.id}>
																			<div>{volunteership.User.username}</div>
																		</div>
																	)
																)}
															</div>
																	)}*/}
																</div>
															</div>
														</div>
													))}
												</div>
											)}
									</Tab>
								</Tabs>
							</div>
						</div>

						{!Number.isNaN(days) && (
							<div className="countdown">
								{days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0 ? (
									<div>Countdown is over!</div>
								) : (
									<div>
										Time until action!
										<br></br>
										{days} days, {hours} hours, {minutes} minutes, {seconds}{" "}
										seconds
									</div>
								)}
							</div>
						)}
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={closeModal}>
						Close
					</Button>
					<Button variant="primary" onClick={handleClick}>
						Join
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
