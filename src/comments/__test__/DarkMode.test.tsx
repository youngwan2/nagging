import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DarkMode from '../DarkMode';
import '../../mocks/matchMedia.mock';
import '../../mocks/localStorage.mock';
// import { localStorageMock } from '../../mocks/localStorage.mock'

describe('DarkMode Component', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('다크모드 컴포넌트가 정상 렌더링 된다.', () => {
    render(<DarkMode />);

    const button = screen.getByLabelText(
      '밝은 테마 및 어두운 테마 바꾸기 버튼',
    );

    expect(button).toBeInTheDocument();
  });

  it('다크모드의 초기 테마는 밝은 테마여야 한다.', () => {
    render(<DarkMode />);

    // 초기 상태는 false 로 어두운 테마로 변경 아이콘이 보여야 함
    const icon = screen.getByTitle('어두운 테마로 변경');

    expect(localStorage.getItem('theme')).not.toBe('dark');
    expect(icon).toBeInTheDocument();
  });

  it('다크모드 버튼을 클릭하면 어두운 테마로 변경된다.', async () => {
    render(<DarkMode />);

    const button = screen.getByLabelText(
      '밝은 테마 및 어두운 테마 바꾸기 버튼',
    );

    await userEvent.click(button);

    //초기 상태에서 1회 토글 시 밝은 테마로 변경 아이콘이 보여야 함
    expect(localStorage.getItem('theme')).toBe('dark');
  });
});
