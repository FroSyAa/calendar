import { useEffect, type ReactNode } from 'react';
import './Modal.scss';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
	useEffect(() => {
		if (!isOpen) {
			return;
		}

		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('keydown', handleEsc);
		return () => document.removeEventListener('keydown', handleEsc);
	}, [isOpen, onClose]);

	if (!isOpen) {
		return null;
	}

	return (
		<div className="modal" role="dialog" aria-modal="true" onClick={onClose}>
			<div className="modal__content" onClick={(event) => event.stopPropagation()}>
				<button
					type="button"
					className="modal__close"
					onClick={onClose}
					aria-label="Закрыть модальное окно"
				>
					×
				</button>
				{children}
			</div>
		</div>
	);
}

