import React, { useRef, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import './style.scss';

import Button from 'react-bootstrap/Button';

const DeleteModal = (props) => {
	const {
		id,
		title = 'Title',
		type = 'type',
		action,
		showModal,
		setShowModal,
	} = props;

	const modalRef = useRef();

	const animation = useSpring({
		config: {
			duration: 300,
		},
		opacity: showModal ? 1 : 0,
		transform: showModal ? `translateY(0%)` : `translateY(-100%)`,
	});

	const closeModal = (e) => {
		if (modalRef.current === e.target) {
			setShowModal(false);
		}
	};

	const keyPress = useCallback(
		(e) => {
			if (e.key === 'Escape' && showModal) {
				setShowModal(false);
			}
		},
		[setShowModal, showModal]
	);

	useEffect(() => {
		document.addEventListener('keydown', keyPress);
		return () => document.addEventListener('keydown', keyPress);
	}, [keyPress]);

	return (
		<>
			{showModal ? (
				<div
					className='delete-modal-container'
					ref={modalRef}
					onClick={closeModal}
				>
					<animated.div style={animation}>
						<div className='delete-modal'>
							<p className='lead'>
								Are you sure you want to delete this {type}?
							</p>
							<h4>{title}</h4>
							<div className='text-center'>
								<Button
									variant='secondary'
									size='lg'
									className='mr-5'
									aria-label='Close modal'
									onClick={() =>
										setShowModal((prev) => !prev)
									}
								>
									Cancel
								</Button>

								<Button
									variant='danger'
									size='lg'
									onClick={() => action(id)}
								>
									Delete
								</Button>
							</div>
						</div>
					</animated.div>
				</div>
			) : null}
		</>
	);
};

export default DeleteModal;
