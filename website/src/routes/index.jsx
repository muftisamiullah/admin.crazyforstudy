import Login from '../Pages/Login.jsx'
import NotAuthorized from '../Pages/NotAuthorized.jsx'
import Dashboard from '../Pages/Dashboard.jsx'
import MyProfile from '../Pages/MyProfile.jsx'
import SubjectList from '../Pages/subject/SubjectList.jsx';
import CreateSubject from '../Pages/subject/CreateSubject.jsx';
import UpdateSubjectSeoQA from '../Pages/subject/UpdateSubjectSeoQA.jsx';
import UpdateSubjectSeoTB from '../Pages/subject/UpdateSubjectSeoTB.jsx';
import UpdateSubjectStudentReviewsTB from '../Pages/subject/UpdateSubjectStudentReviewsTB.jsx';
import UpdateSubjectContentTB from '../Pages/subject/UpdateSubjectContentTB.jsx';
import SubSubjectList from '../Pages/subject/SubSubjectList.jsx';
import CreateSubSubject from '../Pages/subject/CreateSubSubject.jsx';
import AllSubSubjectList from '../Pages/subject/AllSubSubjectList.jsx';
import UploadSubSubject from '../Pages/subject/UploadSubSubject.jsx';
import UpdateSubSubjectSeoQA from '../Pages/subject/UpdateSubSubjectSeoQA.jsx';
import UpdateSubSubjectSeoTB from '../Pages/subject/UpdateSubSubjectSeoTB.jsx';
import UpdateSubSubjectStudentReviewsTB from '../Pages/subject/UpdateSubSubjectStudentReviewsTB.jsx';
import UpdateSubSubjectContentTB from '../Pages/subject/UpdateSubSubjectContentTB.jsx';
import UpdateSubSubjectRelatedQuestions from '../Pages/subject/UpdateSubSubjectRelatedQuestions.jsx';
import AllBookList from '../Pages/Books/AllBookList.jsx';
import UploadBooks from '../Pages/Books/UploadBooks.jsx';
import UploadBulkBooks from '../Pages/Books/UploadBulkBooks.jsx';
import CreateBooks from '../Pages/Books/CreateBooks.jsx';
import BooksChapters from '../Pages/Books/BooksChapters.jsx';
import BookRatingReview from '../Pages/Books/BookRatingReview.jsx';
import BookFaqQuestion from '../Pages/Books/BookFaqQuestion.jsx';
import BookSEO from '../Pages/Books/BookSEO.jsx';
import BooksFreelance from '../Pages/Books/BooksFreelance';
import UploadQuestion from '../Pages/Books/UploadQuestion';
import BookCheckQuality from '../Pages/Books/BookCheckQuality.jsx';
import SimilarBooks from '../Pages/Books/SimilarBooks.jsx';
import QAData from '../Pages/QandA/QAData.jsx';
import DataReport from '../Pages/Report/DataReport';

import AllStudents from '../Pages/Student/AllStudents.jsx';
import AllTutors from '../Pages/Tutor/AllTutors.jsx';
import TutorDetails from '../Pages/Tutor/TutorDetails.jsx';

import VendorList from '../Pages/vendor/VendorList.jsx';

import FaqComponent from '../Pages/FAQ/AllFaq.jsx';
import CreateFaq from '../Pages/FAQ/CreateFaq.jsx';
import CreateFaqQuestion from '../Pages/FAQ/CreateFaqQuestion.jsx';

import DeleteData from '../Pages/DeleteData.jsx';
import ViewData from '../Pages/ViewData.jsx';

import AdminList from '../Pages/Admin/AdminList.jsx';
import CreateAdmin from '../Pages/Admin/CreateAdmin.jsx';
import RoleList from '../Pages/Role/RoleList.jsx';
import CreateRole from '../Pages/Role/CreateRole.jsx';
import ModuleList from '../Pages/Module/ModuleList.jsx';
import CreateModulePassword from '../Pages/Module/CreateModulePassword.jsx';
import RoleModuleList from '../Pages/Permission/RoleModuleList.jsx';

import UploadChapters from '../Pages/Chapters/UploadChapters.jsx';
import ModifyChapters from '../Pages/Chapters/ModifyChapters.jsx';
import UploadSolution from '../Pages/Chapters/UploadSolution.jsx';

import SamplePage from '../Pages/Sample/SamplePage.jsx'

import Solve50 from '../Pages/SolveQA/SolveQAList.jsx'
import UpdateAnswer from '../Pages/SolveQA/UpdateAnswer.jsx'
import RejectQuestion from '../Pages/SolveQA/RejectQuestion.jsx'

import SolveAsk50 from '../Pages/SolveAsk50/SolveAsk50List.jsx'
import UpdateAnswer50 from '../Pages/SolveAsk50/UpdateAnswer50.jsx'
import RejectQuestion50 from '../Pages/SolveAsk50/RejectQuestion50.jsx'

import SolveTBS from '../Pages/SolveTBS/SolveTBSList.jsx'
import UpdateAnswerTbs from '../Pages/SolveTBS/UpdateAnswerTbs.jsx'

import CollegeTB from '../Pages/Textbooks/TextbooksList.jsx'
import UpdateTB from '../Pages/Textbooks/UpdateTB.jsx'

import ReportList from '../Pages/SolutionsReport/ReportList.jsx'

import SolveAssignmentList from '../Pages/SolveAssignment/SolveAssignmentList.jsx'
import UpdateAssignment from '../Pages/SolveAssignment/UpdateAnswerAssignment'


export const guestRoutes =  [
    { 
        path:'/',
        component: Login
    }

];

export const privateRoutes = [
    {
        path: '/dashboard',
        component: Dashboard
    },
    {
        path: '/sample',
        component: SamplePage
    },
    {
        path: '/my-profile',
        component: MyProfile
    },
    {
        path: '/subject',
        component: SubjectList
    },
    {
        path: '/subject-create',
        component: CreateSubject
    },
    {
        path: '/subject-update/:id',
        component: CreateSubject
    },
    {
        path: '/subject-seo/qa/update/:id',
        component: UpdateSubjectSeoQA
    },
    {
        path: '/subject-seo/textbook/update/:id',
        component: UpdateSubjectSeoTB
    },
    {
        path: '/subject-student-reviews/textbook/update/:id',
        component: UpdateSubjectStudentReviewsTB
    },
    {
        path: '/subject-content/textbook/update/:id',
        component: UpdateSubjectContentTB
    },
    {
        path: '/sub-subject/:subject_name/:subject_id',
        component: SubSubjectList
    },
    {
        path: '/sub-subject/:subject_name/create/:subject_id',
        component: CreateSubSubject
    },
    {
        path: '/sub-subject',
        component: AllSubSubjectList
    },
    {
        path: '/sub-subject-seo/qa/update/:id',
        component: UpdateSubSubjectSeoQA
    },
    {
        path: '/sub-subject-seo/textbook/update/:id',
        component: UpdateSubSubjectSeoTB
    },
    {
        path: '/sub-subject-student-reviews/textbook/update/:id',
        component: UpdateSubSubjectStudentReviewsTB
    },
    {
        path: '/sub-subject-content/textbook/update/:id',
        component: UpdateSubSubjectContentTB
    },
    {
        path: '/sub-subject-related-questions/textbook/update/:id',
        component: UpdateSubSubjectRelatedQuestions
    },
    {
        path: '/sub-subject/create',
        component: CreateSubSubject
    },
    {
        path: '/sub-subject/:subject_name/upload/:subject_id',
        component: UploadSubSubject
    },
    {
        path: '/sub-subject/upload',
        component: UploadSubSubject
    },
    {
        path: '/delete-data/:module/:method/:id',
        component: DeleteData
    },
    {
        path: '/view-data/:module?/:rmodule?/:method?/:id',
        component: ViewData
    },
    {
        path: '/books/:type?/:subject?/:sub_subject_name?/:sub_subject_id?',
        component: AllBookList
    },
    
    {
        path: '/books-authoring',
        component: AllBookList
    },

    {
        path: '/books/:type?/:subject?/:sub_subject_name?/:sub_subject_id?',
        component: AllBookList
    },
    {
        path: '/books-upload',
        component: UploadBooks
    },
    {
        path: '/books-bulk-upload',
        component: UploadBulkBooks
    },
    
    {
        path: '/books-create/:subject_name?/:subject_id?/:book_id?',
        component: CreateBooks
    },
    
    {
        path: '/books-upload/:subject_name?/:subject_id?',
        component: UploadBooks
    },
    {
        path: '/books-chapters/:isbn?/:book_name?/:book_id?',
        component: BooksChapters
    },
    {
        path: '/upload-question',
        component: UploadQuestion
    },
    {
        path: '/books-upload-chapters/:isbn?/:book_name?/:book_id?',
        component: UploadChapters
    },
    {
        path: '/books-chapter-add-question/:book_id?/:q_id?',
        component: ModifyChapters
    },
    {
        path: '/books-chapter-question-upload/:book_id?/:q_id?',
        component: UploadSolution
    },
    {
        path: '/books-rating-review/:isbn/:book_id/:review_id?',
        component: BookRatingReview
    },
    
    {
        path: '/books-faq/:isbn/:book_id/:faq_id?',
        component: BookFaqQuestion
    },
    
    
    {
        path: '/books-seo/:isbn?/:book_id?/:seo_id?',
        component: BookSEO
    },
    {
        path: '/books-freelance/:solution_type?/:isbn?/:status?/:section_id?/:sub_section_id?/:question_id?/:exe_name?',
        component: BooksFreelance
    },

    {
        path: '/books-similar-books/:isbn?/:book_id?',
        component: SimilarBooks
    },

    {
        path: '/books-check-quality/:isbn?/:book_id?/:chapter?/:chapter_no?/:status?/:remark?/:question_id?',
        component: BookCheckQuality
    },

    {
        path: '/all-students',
        component: AllStudents
    },
    
    {
        path: '/manage-faq',
        component: FaqComponent
    },
    
    {
        path: '/manage-faq-category',
        component: CreateFaq
    },
    
    {
        path: '/add-faq-question/:faq_category?/:faq_id/:question_id?',
        component: CreateFaqQuestion
    },
    {
        path: '/all-tutors/:status?/:master_subject?/:type?',
        component: AllTutors
    },
    {
        path: '/tutor-details/:tutor_id?',
        component: TutorDetails
    },
    {
        path: '/qa-data/:subject?/:subject_id?/:sub_subject?/:sub_subject_id?/:status?/:chield_subject_id?/:chield_subject?/:page?',
        component: QAData
    },
    {
        path: '/data-report/:subject?/:subject_id?/:sub_subject?/:sub_subject_id?/:status?',
        component: DataReport
    },
    {
        path: '/manage-vendor/:vendor_id?',
        component: VendorList
    },
    {
        path: '/solve-qa/:subject_id?/:sub_subject_id?/:filter?/:page_no?',
        component: Solve50
    },
    {
        path: '/solve-qa-update-answer/:subject_id?/:sub_subject_id?/:filter?/:page_no?/:question_id?',
        component: UpdateAnswer
    },
    {
        path: '/solve-qa-reject-question/:subject_id?/:sub_subject_id?/:filter?/:page_no?/:question_id?',
        component: RejectQuestion
    },
    {
        path: '/solve-ask50/:subject_id?/:sub_subject_id?/:filter?/:page_no?',
        component: SolveAsk50
    },
    {
        path: '/solve-ask50-update-answer/:subject_id?/:sub_subject_id?/:filter?/:page_no?/:question_id?',
        component: UpdateAnswer50
    },
    {
        path: '/solve-ask50-reject-question/:subject_id?/:sub_subject_id?/:filter?/:page_no?/:question_id?',
        component: RejectQuestion50
    },
    {
        path: '/solve-tbs/:filter?/:page_no?',
        component: SolveTBS
    },
    {
        path: '/solve-tbs-update-answer/:filter?/:page_no?/:question_id?',
        component: UpdateAnswerTbs
    },
    {
        path: '/college-textbooks/:filter?',
        component: CollegeTB
    },
    {
        path: '/college-textbooks/:filter?/:isbn?/:id?',
        component: UpdateTB
    },
    {
        path: '/solutions-report/:question_type?/:filter?/:date?',
        component: ReportList
    },
    {
        path: '/solve-assignment/:filter?/:subject_id?/:sub_subject_id?/:pfilter?/:page_no?',
        component: SolveAssignmentList
    },
    {
        path: '/solve-assignment-update-answer/:filter?/:subject_id?/:sub_subject_id?/:pfilter?/:page_no?/:id?',
        component: UpdateAssignment
    },
    
];

export const adminRoutes = [
    {
        path: '/master-admin',
        component: AdminList
    },
    {
        path: '/master-admin/create',
        component: CreateAdmin
    },
    
    {
        path: '/master-admin/update/:id',
        component: CreateAdmin
    },

    {
        path: '/master-role',
        component: RoleList
    },       
    
    {
        path: '/app-modules/:type?/:id?',
        component: ModuleList
    }, 
    
    {
        path: '/app-module/set-password/:module_name?/:module_id?/:module_method?/:id?',
        component: CreateModulePassword
    },
    {
        path: '/master-role/create',
        component: CreateRole
    },

    {
        path: '/master-role/update/:id',
        component: CreateRole
    },
    {
        path: '/role-modules/:type?/:role?/:role_name?/:role_id?/:email?',
        component: RoleModuleList
    }
]